import React from 'react'

const SignIn = () => {
    return (
        <section>
            <form>
                <label>
                    SignIn
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Wyślij" />
            </form>
        </section>
    )
}

export default SignIn