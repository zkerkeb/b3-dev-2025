import './index.css'

const StudentLine = (props) => {
    console.log(props.name)
    return (
        <div>
            <h1 className="student">
          {props.name}
            </h1>
        </div>
    )
}

export default StudentLine