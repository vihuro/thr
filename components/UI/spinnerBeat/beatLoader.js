import BeatLoader from "react-spinners/BeatLoader";
import styles from './beatLoader.module.css'

const Load = () =>{
    return(
        <div className={styles.containerLoader}>
            <BeatLoader className={styles.beatLoader} color="#36d7b7"
                speedMultiplier={0.5} size={30}/>
        </div>
        
    )
}

export default Load