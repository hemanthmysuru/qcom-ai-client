import React from 'react';
import './App.scss';
// import StickyHeaderComponent from './components/StickyHeader/StickyHeade.component';
// import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
// import FooterComponent from './components/Footer/Footer.component';
// import SliderComponent from './components/Slider/Slider.component';
// import CardCarouselComponent from './components/Carousel/CarouselComponent';
// import CardComponent from './components/Card/CardComponent';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/home/HomePage';
// import AboutusPage from './pages/aboutus/AboutusPage';
// import ServicesPage from './pages/services/ServicesPage';
// import NoPage from './pages/nopage/NoPage';
// import ProjectsPage from './pages/projects/ProjectsPage';
// import ContactusPage from './pages/contactus/ContactusPage';
// import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';

const cardPropsList = [
    // {
    //     imageUrl: 'https://media.istockphoto.com/id/490453227/photo/young-woman-showing-her-drivers-license.jpg?s=612x612&w=0&k=20&c=mGhNDkioka7TADQEMRFe84gFtFLkdfPlo4AzTNKJA7Q=',
    //     header: 'Header 1',
    //     subheader: 'Subheader 1',
    //     description: 'Description for Card 1',
    // },
    {
        imageUrl: 'https://st3.depositphotos.com/1177973/14011/i/450/depositphotos_140115960-stock-photo-woman-with-driving-license.jpg',
        header: 'Expert tips',
        subheader: 'Infrastructure',
        description: 'To achieve the effect where the header slides slowly to the top and the subheader hides on hover, you can modify the CSS transitions and positioning. Here’s how you can update your CardComponent and SCSS:',
    },
    // {
    //     imageUrl: 'https://example.com/image3.jpg',
    //     header: 'Header 3',
    //     subheader: 'Subheader 3',
    //     description: 'Description for Card 3',
    // },
];

const App: React.FC = () => {
    return (
        <AppRoutes />
        // <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        //     <CssBaseline />
        //     {/* <StickyHeaderComponent /> */}
        //     <Header />
        //     <Toolbar sx={{ height: '150px' }} />
        //     <Box sx={{ flex: '1 0 auto', p: 0 }}>
        //         <Box component="main">
        //             <Box sx={{ minHeight: 'calc(100vh - 348px)' }}>

        //                 {/* <div className="card-list">
        //                     {cardPropsList.map((cardProps, index) => (
        //                         <CardComponent key={index} {...cardProps} />
        //                     ))}
        //                 </div> */}

        //                 {/* <BrowserRouter> */}
        //                 {/* <Routes>
        //                     <Route index element={<HomePage />}></Route>
        //                     <Route path="home" element={<HomePage />}></Route>
        //                     <Route path="aboutus" element={<AboutusPage />}></Route>
        //                     <Route path="contactus" element={<ContactusPage />}></Route>
        //                     <Route path="*" element={<NoPage />} />
        //                 </Routes> */}
        //                 {/* </BrowserRouter> */}

        //                 {/* <CardComponent /> */}
        //                 {/* <SliderComponent /> */}
        //                 {/* <CardCarouselComponent /> */}

        //                 <AppRoutes />
        //             </Box>

        //         </Box>
        //         <FooterComponent />
        //     </Box>
        // </Box>
    );
}

export default App;
