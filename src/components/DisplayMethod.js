import '../css/methods.css'

function DisplayMethod(props) {

    function makeRows(method) {
        const rows = [];
        let row;
    
        for(let num = 0; num < method.length; num++){
            row = (
                <li className='method'>{method[num]}</li>
            );
            rows.push(row)
        }
    
        return rows;

    }

    return (
        <>{makeRows(props.method)}</>
    )
}

export default DisplayMethod