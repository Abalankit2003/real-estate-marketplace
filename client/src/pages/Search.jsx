import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm:'',
        type : 'all',
        offer : false,
        parking: true,
        furnished: true,
        sort:'createdAt',
        order:'desc'
    });

    const navigate = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const offerFromUrl = urlParams.get('offer');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('parking');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchTermFromUrl || typeFromUrl || offerFromUrl || parkingFromUrl || furnishedFromUrl || sortFromUrl || orderFromUrl) {
            setSidebarData({
              searchTerm: searchTermFromUrl || "",
              type : typeFromUrl || 'all',
              offer : offerFromUrl === 'true' ? true : false,
              parking : parkingFromUrl === 'true' ? true : false,
              furnished : furnishedFromUrl === 'true' ? true : false,
              sort : sortFromUrl || 'createAt',
              order : orderFromUrl || 'desc'
            });
        }

        const fetchListings = async() => {
            const searchQuery = urlParams.toString();
            const listings = await fetch(`/api/listing/get?${searchQuery}`);

            const data = await listings.json();
            console.log(data);
        }

        fetchListings();
    }, [location.search]);


    const handleChange = (e) =>{
        if(e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData, searchTerm : e.target.value});
        }
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebarData({...sidebarData, type : e.target.id});
        }
        if(e.target.id === 'parking' || e.target.id === 'offer' || e.target.id === 'furnished') {
            setSidebarData({...sidebarData, [e.target.id] : e.target.checked})
        }
        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1];
            setSidebarData({...sidebarData,sort, order })
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={sidebarData.searchTerm}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer === true}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking === true}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished === true}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select className="border rounded-lg p-3" id='sort_order' onChange={handleChange} value={sidebarData.sort + '_' + sidebarData.order}>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
      </div>
    </div>
  );}
