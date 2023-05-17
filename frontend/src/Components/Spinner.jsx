import React from 'react'
import styles from '../Styles/Spinner.module.css';

export default function Spinner() {

    return (
        <div className={styles.spinnerWrapper}>
        <div className={styles.spinnerCenter}>
            <div id={styles.container}>
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                                floodColor="white" />
                        </filter>
                    </defs>
                    <circle id={styles.spinner} style={{ fill: "transparent", stroke: "var(--ThemeColor)", strokeWidth: "5px", strokeLinecap: "round", filter: "url(#shadow)" }} cx="50" cy="50" r="30" />
                </svg>
                <p>LOADING...</p>
            </div>
            
        </div>
        </div>

    )
};