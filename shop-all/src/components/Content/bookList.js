import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom";
import './Content.css';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan Bootstrap terpasang

export default function AboutUs() {
    
    const [firstName, setFirstName] = useState('');
    useEffect(() => {
        // Ambil nilai firstName dari localStorage saat komponen dimuat
        const storedFirstName = localStorage.getItem('firstName');
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      }, []);
    

    return (

        <div>
        <Helmet>
            <title>
                Book List
            </title>
        </Helmet>
        <h1>book list</h1>
        <div className="border1">
             <p >ss</p>
        </div>
        </div>
        
  
    );
  }