import { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import axios from 'axios';

import logo from '../../logo.svg';



function Login() {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);

    const toast = useRef(null);

    const show = () => {
        toast.current.show({severity: 'info', summary: 'Info', detail: `Email: ${email}, Password: ${password}`});
    }

    function handleSubmit() {
        const user = {
            email: email,
            password: password,
        };

        axios.post("http://localhost:3000/login", user)
            .then(res => {
                toast.current.show({severity: 'success', summary: "Login Success", detail: `Access Token: ${res.data.accessToken}`});
            })
            .catch(err => {
                toast.current.show({severity: 'error', summary: "Error", detail: err.response.data});
            })
    }


    return (
        <>
            <Toast ref={toast} />
            <div className="pt-5 flex flex-wrap align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full md:w-8 lg:w-6">
                    <div className="text-center mb-5">
                        <img src={logo} alt="hyper" height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                            href={"/register"}>Sign up Now!</a>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>

                        <label htmlFor="password" className="block text-900 font-medium mb-2 w-full">Password:</label>
                        <div className="p-inputgroup mb-3">
                            <InputText id="password" type={togglePassword ? 'text': "password" } placeholder="Password" className="w-full" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                            <Button icon={ togglePassword ? 'pi pi-eye' : 'pi pi-eye-slash'}
                                onClick={e => setTogglePassword(!togglePassword)}
                            />
                        </div>

                        <div className="flex align-items-center justify-content-between mb-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                                <label htmlFor="rememberme">Remember me</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                        </div>

                        <Button label="Sign In" icon="pi pi-user" className="w-full" 
                            disabled={email === "" || password === ""}
                            onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;