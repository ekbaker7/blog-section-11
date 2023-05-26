import { Fragment } from 'react'
import HeroComponent from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';
import Head from 'next/head';

function HomePage(props) {
    return ( 
        <Fragment>
            <Head>
                <title>Emmett's Blog</title>
                <meta name="description" content="I am learning NextJS" />
            </Head>
            <HeroComponent />
            <FeaturedPosts posts={props.featuredPosts}/>
        </Fragment>
    )
}

export async function getStaticProps () {
    const featuredPosts = getFeaturedPosts()

    return {
        props: {
            featuredPosts
        },
        revalidate: 100
    }
}

export default HomePage;