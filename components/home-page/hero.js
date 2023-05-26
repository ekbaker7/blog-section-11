import { } from 'react'
import Image from 'next/image'

import classes from './hero.module.css'

function HeroComponent(props) {
    return ( <section className={classes.hero}>
        <div className={classes.image}>
            <Image src="/images/site/crow.jpg" alt="An image showing a crow" width={300} height={300} />
        </div>
        <h1>Haldo, I'm Emmett</h1>
        <p>
            I am a software engineer learning NextJS.
        </p>
    </section> );
}

export default HeroComponent;