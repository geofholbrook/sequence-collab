
import React from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import { appId } from "../config";
import "./CodePen.css"

export function FacebookLoginButton(props: {callback: (userInfo: ReactFacebookLoginInfo) => void}) {
    return (<FacebookLogin
        appId={appId}
        autoLoad={false}
        fields="name,email,picture"
        callback={props.callback}
        cssClass="loginBtn loginBtn--facebook"
      />)
}