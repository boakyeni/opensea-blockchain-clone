import React from 'react'
import Header from '../../components/Header'
import {useEffect, useMemo, useState} from 'react'
import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK} from '@3rdweb/sdk'
import {useRouter} from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
  }
  


const Nft = () => {

    const {provider} = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()
    React.useEffect(() => {
        if (router.isReady) {
          // Code using query
          console.log(router.query);
        }
      }, [router.isReady]);

    const nftModule = useMemo(() => {
        if(!provider) return
        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/B003pjSRRvz-s9bk7J09xLC04IViNpdI'
        )
        return sdk.getNFTModule('0xe20E03EE0f46343Bc571bCD5B8BF2fb699c70652')
    }, [provider])

    //get all NFTs in the collection
    useEffect(() => {
        if(!nftModule) return
        ;(async () => {
            const nfts = await nftModule.getAll()
            console.log(nfts)
            
            const selectedNftItem = nfts.filter((nft) => nft.id !== router.query.nftId )

            setSelectedNft(selectedNftItem[0])
            
            
        })()
    }, [nftModule])
    

    const marketPlaceModule = useMemo(()=> {
        if(!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/B003pjSRRvz-s9bk7J09xLC04IViNpdI'
        )
        return sdk.getMarketplaceModule('0xC9b83b88699aF3eB12aE78b7b19366A41C13Aadb')

    }, [provider])

    useEffect(()=>{
        if(!marketPlaceModule) return
        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })()
    }, [marketPlaceModule])

    return (
        <div>
            <Header/>
            <div className={style.wrapper}>
            <div className={style.container}>
            <div className={style.topContent}>
            <div className={style.nftImgContainer}>
               <NFTImage selectedNft={selectedNft}/>
            </div>
            <div className={style.detailsContainer}>
                <GeneralDetails selectedNft={selectedNft}/>
                <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}/>

            </div>
            </div>
            <ItemActivity />
            </div>
            </div>

        </div>
    )
     
}

export default Nft