import React from 'react'

export function registerForm () {
    return ( <div>
    <h1> Register </h1>
        <form>
            <label htmlfor="email"> Email Adrdess </label>
            <input id='email' name='email' />

            <button type="submit"> Register </button>
        </form>

    </div>)
}