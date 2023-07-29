const Notification = ({message, messageType}) => {
    if (message === null) {
        return null
    } else {
        if (messageType === "info"){
            return (
                <div className="notification-info">
                    <h1>{message}</h1>
                </div>
            )
        } else {
            return (
                <div className="notification-error">
                    <h1>{message}</h1>
                </div>
            )
        }
    }
}

export default Notification