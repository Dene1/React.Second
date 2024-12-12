import {useState} from "react"
import styles from "./app.module.css"
import data from "./data.json"

export const App = () => {

    const [steps, setSteps] = useState(data)
    const [activeIndex, setActiveIndex] = useState(0)

    const onClickBack = () => {
        setActiveIndex(activeIndex - 1)
    }

    const onClickForward = () => {
        if (isLast) {
            setActiveIndex(0)
        } else {
            setActiveIndex(activeIndex + 1)
        }
    }

    const isStart = activeIndex === 0
    const isLast = activeIndex === steps.length - 1

    const getStepItemClass = (item) => {
        if (item.id === steps[activeIndex].id) {
            return `${styles["steps-item"] + " " + styles.active}`
        } else if (steps[activeIndex].id > item.id) {
            return `${styles["steps-item"] + " " + styles.done}`
        } else {
            return styles["steps-item"]
        }
    }

    const stepItems = steps.map((item, index) => {
        return (
            <li className={getStepItemClass(item)}
                key={item.id}>
                <button className={styles["steps-item-button"]} onClick={() => {
                    setActiveIndex(index)
                }}>
                    {(index + 1)}
                </button>
                {item.title}
            </li>
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles["steps-content"]}>
                        {steps[activeIndex].content}
                        <br/>
                        <br/>
                        <br/>
                        Сейчас активен шаг {activeIndex + 1}
                    </div>
                    <ul className={styles["steps-list"]}>
                        {stepItems}
                    </ul>
                    <div className={styles["buttons-container"]}>
                        <button
                            className={styles.button}
                            onClick={onClickBack}
                            disabled={isStart}>
                            Назад
                        </button>
                        <button className={styles.button} onClick={onClickForward}>
                            {isLast ? "Начать сначала" : "Далее"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
