import React, { useEffect, useState } from 'react';
import Image from './components/Image';
import './App.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Home({ photos, setPhotos, pageNum, setPageNum, urlDict, setUrlDict, authorDict, setAuthorDict }) {
  const getPhotos = () => {
    fetch(`https://picsum.photos/v2/list?page=${pageNum}`)
      .then(response => response.json())
      .then((data) => {
        const new_url_dict = urlDict;
        const new_author_dict = authorDict;
        data.map((item) => {
          const id = item.id;
          const url = item.download_url;
          const author = item.author;


          new_url_dict[id] = url;
          new_author_dict[id] = author;
        });

        setUrlDict(new_url_dict);
        setAuthorDict(new_author_dict);
        setPhotos(photos.concat(data))
      });

    setPageNum(pageNum + 1);
  };

  const getPhotosFirstTime = () => {
    if (pageNum !== 1) {
      return;
    }
    getPhotos();
  };

  useEffect(getPhotosFirstTime, [])

  return (
    <div className='app'>
      <ResponsiveMasonry columnsCountBreakPoints={{ 250: 1, 500: 2, 750: 3, 900: 4 }}>
        <Masonry gutter="10px">
          {
            photos.map((photo, i) => (
              <Link
                key={photo.id}
                to={`/${photo.id}`}
              >
                <img className='home-image' width="100%" src={photo.download_url} />
              </Link>
            ))
          }
        </Masonry>
      </ResponsiveMasonry>
      <div className='btn-container'>
        <button className='load-more-btn' onClick={getPhotos} >Load More</button>
      </div>
    </div >
  )
}


function App() {
  const [photos, setPhotos] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [urlDict, setUrlDict] = useState({});
  const [authorDict, setAuthorDict] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:imageId" element={<Image authorDict={authorDict} urlDict={urlDict} />} />
        <Route path="/"
          element={
            <Home
              photos={photos}
              setPhotos={setPhotos}
              pageNum={pageNum}
              setPageNum={setPageNum}
              urlDict={urlDict}
              setUrlDict={setUrlDict}
              authorDict={authorDict}
              setAuthorDict={setAuthorDict}
            />}
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
