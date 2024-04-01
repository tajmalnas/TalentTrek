import React, {useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Subscription = () => {
    const [sessionId, setSessionId] = useState(null);

    const handleCheckout = async() => {
        try{
            const response = await fetch("http://localhost:5000/checkout",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({items: [
                    {
                        id : 1,
                        quantity: 1,
                        price: 1000,
                        name: "Premium"
                    }
                ]
            })
            })
            const data = await response.json();
            window.location.href = data.url;
            console.log(data);
            setSessionId(data.sessionId);
            checkout(data.sessionId);
        }
        catch(error){
            console.log(error)
        }
    }

    const checkout = async(id) => {
        console.log(id);
        const stripe = await loadStripe("pk_test_51OmWSbSAHn2m6boXjN6lbTtOyAklIdJH3BtZPtEkwcdxTyor3veQWuKUFsFJAsKtjSmFwoOSVhZHCDvWDMv2jkgk00fONA1ssD");
        const { error } = await stripe.redirectToCheckout({
            sessionId: id,

            successUrl: 'http://localhost:5173/success',
            mode: 'payment', // Add your success URL here,
            cancelUrl: 'http://localhost:5173/cancel',
           });
        
        if (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='flex min-h-screen pt-[30px] px-[40px]'>
        <div className="min-w-full">
            <div className='text-center'>
                <p className="text-white text-3xl leading-[40px] font-semibold">
                    Your Subscription
                </p>

                {/* <div>
                    <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                        Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend faucibus.
                    </p>
                </div> */}
            </div>

                <div className="mt-[20px] flex justify-center flex-wrap gap-5">
                    <div key="1" className="w-80  bg-slate-900 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] divide-y">
                        <div className="pt-[15px] px-[25px] pb-[25px]">
                            <div className="flex justify-end">
                                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                    <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                        Starter
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white text-[19px] leading-[25px] font-bold">
                                    Free
                                </p>
                                <p className="text-black text-white">
                                    Limited job postings
                                </p>
                            </div>
                            <p className="text-white text-[50px] leading-[63px] font-bold">
                                    $0
                            </p>
                        </div>

                        <div className="pt-[25px] px-[25px] pb-[35px]">
                            <div>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Upto 3 job postings
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Limited AI capabilities
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    No automatic resume parsing
                                </p>
                            </div>

                            <div className="mt-[25px]">
                                <button className="w-full bg-slate-800 border border-white rounded-[5px] py-[15px] px-[25px] text-gray-400 text-[14px] leading-[17px] font-semibold">Current Plan</button>
                            </div>
                        </div>
                    </div>

                    <div key="2" className="w-80  bg-slate-900 rounded-[10px] shadow-[0px 1px 2px #E1E3E5] divide-y">
                        <div className="pt-[15px] px-[25px] pb-[25px]">
                            <div className="flex justify-end">
                                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                    <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                        Starter
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white text-[19px] leading-[25px] font-bold">
                                    Silver
                                </p>
                                <p className="text-black text-white">
                                    Upto 10 job postings
                                </p>
                            </div>
                            <p className="text-white text-[50px] leading-[63px] font-bold">
                                    $10
                            </p>
                        </div>

                        <div className="pt-[25px] px-[25px] pb-[35px]">
                            <div>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Upto 10 job postings
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    AI interview
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Resume Parsing
                                </p>
                            </div>

                            <div className="mt-[25px]">
                                <button onClick={handleCheckout} className="w-full bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Upgrade +</button>
                            </div>
                        </div>
                    </div>

                    <div key="3" className="w-80  bg-white rounded-[10px] shadow-[0px 1px 2px #E1E3E5] divide-y">
                        <div className="pt-[15px] px-[25px] pb-[25px]">
                            <div className="flex justify-end">
                                <div className="bg-purple-400 rounded-[20px] flex justify-center align-center px-[12px]">
                                    <p className="text-black text-[12px] leading-[28px] font-bold">
                                        Popular
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white text-orange-400 font-bold text-xl leading-[25px] font-bold">
                                    Gold
                                </p>
                                <p className="text-black">
                                    For large job postings
                                </p>
                            </div>
                            <p className="text-black text-[50px] leading-[63px] font-bold">
                                    $20
                            </p>
                        </div>

                        <div className="pt-[25px] px-[25px] pb-[35px]">
                            <div>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Unlimited job postings
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    Resume Parsing
                                </p>
                                <p className="text-[#717F87] text-[14px] leading-[48px] font-medium">
                                    AI generated skill-based interview
                                </p>
                            </div>

                            <div className="mt-[25px]">
                                <button onClick={handleCheckout} className="w-full bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Upgrade ++</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Subscription










































