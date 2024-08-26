import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
  const [listingData, setListingData] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();

        if (data.success == false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setListingData(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchListing();
  }, [params.id]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listingData && !loading && !error && (
        <div>
          <Swiper navigation>
            {listingData.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        )}
    </main>
  );
}
