import React from 'react'
import ReactQueryParams from 'react-query-params'
import WOW from 'wowjs'

import Header from "./components/TopSection/Header/Header";
import HeaderSecond from "./components/TopSection/Header/HeaderSecond";
import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import SecondMidSection from './components/SecondMidSection/SecondMidSection'
import BottomSection from './components/BottomSection/BottomSection'

// Pages
import * as Pages from './pages'
import {BrowserRouter, Route} from "react-router-dom";

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);
        if (window.location.host.indexOf("localhost") > -1) {
            this.setQueryParams({
                validation: 3
            });
        }
        this.state = {
            step: 1,
            page: 'main'
        };
    }

    componentDidMount() {
        new WOW.WOW().init();
        if(window.location.pathname === '/secondpage') {
            this.setState({
                step: 2
            })
        }
        if(this.state.step === 2) {
            this.setState({
                page: 'secondpage'
            })
        }
    }

    //According to Readme
    pageHandler = (page) => {
        window.scrollTo(0, 0);
        switch (page) {
            default:
                this.setState({page: 'main'});
                break;
            case 'second':
                this.setState({page: Pages.terms});
                alert("Second Page")
                break;
            case 'terms':
                this.setState({page: Pages.terms});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'disc':
                this.setState({page: Pages.disc});
                break;
            case 'spam':
                this.setState({page: Pages.spam});
                break;
        }
    };

    handleStep = (step) => {
        this.setState({step})
    };

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
            .then(() => this.setState({
                step: 1,
                page: 'main'
            }), window.history.go(-1));
    };

    render() {
        return(
            <BrowserRouter>
                <div className='App'>
                    <Route exact path='/' render={() =>
                        <div>
                            <HeaderSecond languageManager={this.props.languageManager}/>
                            <TopSection form={this.state.leadData}
                                        countryCode={this.props.countryCode}
                                        handleStep={this.handleStep} step={this.state.step}
                                        handleSubmit={this.handleSubmit}
                                        pageHandler={this.pageHandler}
                                        handleForward={this.handleForward}
                                        languageManager={this.props.languageManager}
                                        validateParams={this.props.validateParams}/>
                            <MidSection languageManager={this.props.languageManager}
                                        validateParams={this.props.validateParams}/>
                            <BottomSection form={this.state.leadData}
                                           countryCode={this.props.countryCode}
                                           handleStep={this.handleStep} step={this.state.step}
                                           handleSubmit={this.handleSubmit}
                                           pageHandler={this.pageHandler}
                                           handleForward={this.handleForward}
                                           languageManager={this.props.languageManager}
                                           validateParams={this.props.validateParams}/>
                        </div>
                    }
                    />
                </div>
                <Route path='/secondpage' render={() =>
                    <div>
                        <HeaderSecond languageManager={this.props.languageManager}/>
                        <TopSection form={this.state.leadData}
                                    countryCode={this.props.countryCode}
                                    handleStep={this.handleStep} step={this.state.step}
                                    handleSubmit={this.handleSubmit}
                                    pageHandler={this.pageHandler}
                                    handleForward={this.handleForward}
                                    languageManager={this.props.languageManager}
                                    validateParams={this.props.validateParams}/>
                        <SecondMidSection languageManager={this.props.languageManager}
                                          validateParams={this.props.validateParams}/>
                        <BottomSection form={this.state.leadData}
                                       countryCode={this.props.countryCode}
                                       handleStep={this.handleStep} step={this.state.step}
                                       handleSubmit={this.handleSubmit}
                                       pageHandler={this.pageHandler}
                                       handleForward={this.handleForward}
                                       languageManager={this.props.languageManager}
                                       validateParams={this.props.validateParams}/>
                    </div>
                }
                />
            </BrowserRouter>
        )
    }
}
