import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const LoginPage: React.FC = () => {
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [adminLoading, setAdminLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (formType === 'signIn') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage('Success! Please check your email for a confirmation link.');
            }
        } catch (error: any) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleAdminLogin = async () => {
        setAdminLoading(true);
        setError(null);
        setMessage(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: 'admin@datapyramid.com',
                password: 'pyramid-admin-!2024'
            });
            if (error) throw error;
        } catch (error: any) {
             setError(error.error_description || error.message);
        } finally {
            setAdminLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-50/80 backdrop-blur-md rounded-lg border border-slate-300 shadow-sm glowing-shadow-amber">
                <div className="text-center">
                    <h1 className="text-4xl font-cinzel font-bold tracking-wider bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        DATA PYRAMID
                    </h1>
                    <p className="mt-2 text-slate-600">
                        {formType === 'signIn' ? 'Enter the Temple of Marketing Intelligence' : 'Create your account to enter the Temple'}
                    </p>
                </div>

                {error && <p className="text-center text-red-500 text-sm">{error}</p>}
                {message && <p className="text-center text-green-500 text-sm">{message}</p>}

                <form className="mt-8 space-y-6" onSubmit={handleAuthAction}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-400 bg-white placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password-sr" className="sr-only">Password</label>
                            <input 
                                id="password-sr" 
                                name="password" 
                                type="password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-400 bg-white placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading || adminLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-white disabled:bg-amber-300 disabled:cursor-not-allowed">
                            {loading ? 'Processing...' : (formType === 'signIn' ? 'Unlock the Gates' : 'Create Account')}
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-slate-600">
                    {formType === 'signIn' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => {
                            setFormType(formType === 'signIn' ? 'signUp' : 'signIn');
                            setError(null);
                            setMessage(null);
                        }}
                        className="font-medium text-amber-600 hover:text-amber-500"
                    >
                        {formType === 'signIn' ? 'Sign up' : 'Sign in'}
                    </button>
                </p>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-300"></div>
                    <span className="flex-shrink mx-4 text-xs text-slate-500">Quick Access</span>
                    <div className="flex-grow border-t border-slate-300"></div>
                </div>

                <div>
                    <button onClick={handleAdminLogin} disabled={adminLoading || loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-white disabled:bg-slate-400 disabled:cursor-not-allowed">
                        {adminLoading ? 'Signing in...' : 'Sign in as Admin'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;