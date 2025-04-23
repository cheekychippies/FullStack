const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        //<div className="success">{message}</div>
        <div className={message.type}>
            {message.text}
        </div>
    )
}

export default Notification