import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';
import Login from './login';
import AboutUs from './about';
import ContactUs from './contact';
import Home_page from './home';
import Header from './header';
import ProfilePage from './profilepage';
import Header2 from './header2';
import LandClass from './landclass';
import GovtLands from './govtlands';
import NonGovtLands from './nongovtlands';
import LandTemplate from './landtemplate';
import Finance from './finance';
import TransactionPage from './transactionpage';
import ConfirmationPage from './confirmationpage';
import Summary from './summary';
import SellerDetails from './sellerdetails';
import SurveyFinance from './surveyfinance';
import Wishlist from './wishlist';
import SignUp from './signup';
import SurveyorLogin from './surveyorlogin';
import SurveyDepartmentPage from './survey';
import SurveyorSignUp from './surveyorsignup';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contactus />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profilepage" element={<Profile_Page />} />
      <Route path="/landclass" element={<Landclass />} />
      <Route path="/govtlands" element={<Govtlands />} />
      <Route path="/nongovtlands" element={<Nongovtlands />} />
      <Route path="/landtemplate" element={<Landtemplate />} />
      <Route path="/finance" element={<Finance_page />} />
      <Route path="/transactionpage" element={<Transaction_page />} />
      <Route path="/confirmationpage" element={<Confirmation_page />} />
      <Route path="/summary" element={<Summary_page />} />
      <Route path="/sellerdetails" element={<Sellerdetails />} />
      <Route path="/surveyfinance" element={<Surveyfinance />} />
      <Route path="/wishlist" element={<Wishlist_page />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/surveyorlogin" element={<Surveyorlogin />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/surveyorsignup" element={<SurveyorSignUpPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

const Homepage = () => (
  <div>
    <HomePage />
  </div>
);

const Signin = () => (
  <div>
    <Login />
  </div>
);

const About = () => (
  <div>
    <AboutUs />
  </div>
);

const Contactus = () => (
  <div>
    <ContactUs />
  </div>
);

const Home = () => (
  <div>
    <Header />
    <Home_page />
  </div>
);

const Profile_Page = () => (
  <div>
    <Header2 />
    <ProfilePage />
  </div>
);

const Landclass = () => (
  <div>
    <Header />
    <LandClass />
  </div>
);

const Govtlands = () => (
  <div>
    <Header />
    <GovtLands />
  </div>
);

const Nongovtlands = () => (
  <div>
    <Header />
    <NonGovtLands />
  </div>
);

const Landtemplate = () => (
  <div>
    <Header />
    <LandTemplate />
  </div>
);

const Finance_page = () => (
  <div>
    <Header />
    <Finance />
  </div>
);

const Transaction_page = () => (
  <div>
    <Header />
    <TransactionPage />
  </div>
);

const Confirmation_page = () => (
  <div>
    <ConfirmationPage />
  </div>
);

const Summary_page = () => (
  <div>
    <Summary />
  </div>
);

const Sellerdetails = () => (
  <div>
    <Header />
    <SellerDetails />
  </div>
);

const Surveyfinance = () => (
  <div>
    <Header />
    <SurveyFinance />
  </div>
);

const Wishlist_page = () => (
  <div>
    <Header />
    <Wishlist />
  </div>
);

const Signup = () => (
  <div>
    <SignUp />
  </div>
);

const Surveyorlogin = () => (
  <div>
    <SurveyorLogin />
  </div>
);

const SurveyPage = () => (
  <div>
    <SurveyDepartmentPage />
  </div>
);

const SurveyorSignUpPage = () => (
  <div>
    <SurveyorSignUp />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
