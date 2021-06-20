import React from 'react'

export const LoginForm = ({login}) => {
    return (
        <div className="login-form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" />
            </div>
            <button onClick={login}>Login</button>
        </div>
    )
}
