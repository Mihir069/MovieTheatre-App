import "./style.css"
const ProgressBar = ({stars})=>{
    const percentage = (stars/10)*100;

    return(
        <div className="circle-progress-container">
        <svg className="circle-progress">
          <circle className="circle-progress-bar" cx="25" cy="25" r="20" fill="transparent" strokeWidth="4" />
          <circle className="circle-progress-indicator" cx="25" cy="25" r="20" fill="transparent" strokeWidth="4" strokeDasharray={`${percentage}, 100`} />
        </svg>
        <div className="circle-progress-label">{stars.toFixed(1)}/10</div>
      </div>
  
    )

}
export default ProgressBar;