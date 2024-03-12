function SMInput(props) {
    return (
        <>
            <div className='inputDiv'>
                {props.icon}
                <input autoComplete={props.autoComplete} type={props.type} id={props.id}name={props.name} value={props.value} onBlur={props.onBlur} onChange={props.onChange} placeholder={props.placeholder} className='inputIcon' icon={props.icon} />
            </div>
        </>
    )
}

export default SMInput;