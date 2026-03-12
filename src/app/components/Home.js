"use client";

import React from 'react';
import InputForm from './InputForm';
import SearchComponent from './SearchComponent';
import PostList from './PostList';
import { useAuth } from './AuthContext';
import Intro from './Intro';
import AboutUs from './AboutUs';
import HowItWork from './HowItWork';
import TakeToSign from './TakeToSign';



const Home = () => {
  const { isAuthenticated, userPosts } = useAuth();

  return (
    <main className="flex flex-col min-h-screen">
      {/* بدلاً من Element name="intro" 
          نستخدم id="intro" على div عادي أو مباشرة داخل المكون 
      */}
     

       
      <HowItWork />

      {/* المنطق الشرطي للعرض */}
      {!isAuthenticated && <TakeToSign />}
      
     

      <section id="about-us">
        <AboutUs />
      </section>
    </main>
  );
};

export default Home;