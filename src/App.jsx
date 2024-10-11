import { useState,useEffect } from 'react'
import {AccountDeletionForm,Qr,Socialforgotuserpassword , Carreceiptimg,Addsocialadmin,Socialforgotadminpassword,Carreceipt,BuyToken,Renderitem,Checksocialorder,Socialadminsignin,Receipt,Uploadsocialcar,Socialsignin,Socialverify,Socialsignup,Forgotsellerpassword,Forgotuserpassword,Usersignup,Sellersignup,Aboutex,Verify,SellerLogin,Tl,Adminmessages,Usermessages,Inspectormessages,Cardetails,Admincars,Adminlogin,Inspectordb,Inspector,Ra,Uploadcar,RealNav,Aboutpage1,Aboutpage2,About,Aboutpage3,Bookfree,Contact,Corevalues,Footer,Gallery,Head,Services,Team,Visionnmission,Login,Abujacardatapage, Searchresult } from '../src/components'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { lazy,Suspense } from 'react';
import { Spin,Flex } from 'antd';
const Brands = lazy(() => import('../src/components/Brands'));
const Whyabujacar=lazy(() => import('../src/components/Whyabujacar'));
const BrandsLazy = () => {
  return (
    <Suspense fallback={<Flex align="center">
    <Spin size="large" />
  </Flex>
    }>
      <Brands />
    </Suspense>
  );
}
const WhyabujacarLazy = () => {
  return (
    <Suspense fallback={<Flex align="center">
 
    <Spin size="large" />
  </Flex>}>
      <Whyabujacar />
    </Suspense>
  );
}
function App() {
 useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <BrowserRouter>
    <Routes>
  
    <Route path='/' element={<>
      <div className='text-[#faf9f6] outline-none overflow-hidden'>
<RealNav />
<div className='h-20'>

</div>
<Aboutex />
<About />
<Aboutpage1 />
<Aboutpage2 />

<Aboutpage3 />
<BrandsLazy/>
<WhyabujacarLazy />
<Contact/>
<Bookfree/>
<Footer/>
</div>
</>} />
<Route path='/team' element={<Team />} />
<Route path='/gallery' element={<Gallery />} />
<Route path='/login' element={<Login />} />
<Route path='/datapage' element={<Abujacardatapage />} />
<Route path='/uploadcar' element={<Uploadcar />} />
<Route path='/rollingautomobile' element={<Ra />} />
<Route path='/inspector' element={<Inspector />} />
<Route path='/inspectordb' element={<Inspectordb />} />
<Route path='/adminlogin' element={<Adminlogin />} />
<Route path='/admincars' element={<Admincars />} />
<Route path='/search' element={<Searchresult/>} />
<Route path='/cardetails' element={<Cardetails />} />
<Route path='/inspectormessages' element={<Inspectormessages />} />
<Route path='/inspectormessages' element={<Inspectormessages />} />
<Route path='/usermessages' element={<Usermessages />} />
<Route path='/adminmessages' element={<Adminmessages />} />
<Route path='/tl' element={<Tl />} />
<Route path='/sellerLogin' element={<SellerLogin />} />
<Route path='/verify' element={<Verify />} />
<Route path='/sellersignup' element={<Sellersignup />} />
<Route path='/usersignup' element={<Usersignup />} />
<Route path='/forgotsellerpassword' element={<Forgotsellerpassword />} />
<Route path='/forgotuserpassword' element={<Forgotuserpassword />} />
<Route path='/socialsignup' element={<Socialsignup />} />
<Route path='/verifypage' element={<Socialverify />} />
<Route path='/socialsignin' element={<Socialsignin />} />
<Route path='/uploadsocialcar' element={<Uploadsocialcar />} />
<Route path='/receipt' element={<Receipt />} />
<Route path='/socialadminsignin' element={<Socialadminsignin />} />
<Route path='/checksocialorder' element={<Checksocialorder />} />
<Route path='/renderitem' element={<Renderitem/>} />
<Route path='/buytoken' element={<BuyToken/>} />
<Route path='/carreceipt' element={<Carreceipt />} />
<Route path='/socialforgotadminpassword' element={<Socialforgotadminpassword />} />
<Route path='/Addsocialadmin' element={<Addsocialadmin />} />

<Route path='/Deleteaccount' element={<AccountDeletionForm />} />
<Route path='/carreceiptimg' element={<Carreceiptimg />} />
<Route path='/socialforgotuserpassword' element={<Socialforgotuserpassword  />} />
<Route path='/qr' element={<Qr />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
