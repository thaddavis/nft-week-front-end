import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";

import { useNavigate } from "react-router-dom";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

export const Artworks = () => {
  const [nfts] = useGlobalState("nfts");
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return nfts.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nfts, end]);

  return (
    <div className="bg-white gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-[#e32970] text-3xl font-bold uppercase">
          {collection.length > 0 ? "Featured" : "No Artwork Yet"}
        </h4>

        <CrossmintPayButton
          clientId="80c3f288-e48b-4fb6-a7dc-3d43ca029451"
          mintConfig={{"type":"thirdweb-drop","totalPrice":"0.001","quantity":"1"}}
          environment="staging"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {collection.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>

        {/* {collection.length > 0 && nfts.length > collection.length ? (
          <div className="text-center my-5">
            <button
              className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f]
            rounded-full cursor-pointer p-2"
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

const Card = ({ nft }) => {
  const navigate = useNavigate();

  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };

  return (
    <div className="w-full shadow-lg shadow-[#e32970] rounded-md overflow-hidden bg-white my-2 p-3">
      <div className="box-content h-80 mb-6">
        <div className="grid place-items-center">
          <img
            src={nft.metadataURI}
            alt={nft.title}
            className={`h-80 w-auto ${nft.aspectRatio} object-fit shadow-md shadow-[#e32970] rounded-lg mb-3`}
          />
        </div>
      </div>
      <h4 className="text-[#e32970] font-semibold">{nft.title}</h4>
      <p className="text-[#e32970] text-xs my-1">{nft.description}</p>
      <div className="flex justify-between items-center mt-3 text-[#e32970]">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="text-sm font-semibold">{nft.cost} ETH</p>
        </div>

        <span>
          <button
            className="shadow-md shadow-black text-white text-sm bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-2 m-1"
            onClick={() => {
              if (nft.id === "gator" || nft.id === "flamingo") {
                navigate(`/3d/${nft.id}`);
              } else {
              }
            }}
          >
            View
          </button>

          <button
            className="shadow-md shadow-black text-white text-sm bg-[#e32970]
            hover:bg-[#bd255f] cursor-pointer rounded-full px-4 py-2 m-1"
            onClick={setNFT}
          >
            Buy
          </button>
        </span>
      </div>
    </div>
  );
};
