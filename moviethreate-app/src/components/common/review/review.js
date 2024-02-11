const Reviews = ({stars}) =>{
    const ratingStar = Array.from({length:5},(elem,index)=>{
        let number = index + 0.5;
        return(
            <span key={index}>
                {
                    stars>= index +1 ?(<img src="./svg/star-solid.svg" width='20px' alt="star-solid"/>)
                    :stars>=number? (<img src="./star-half-stroke-regular.svg" width='20px' alt="star-half"/>)
                    :(<img src="./svg/star-regular.svg" width='20px' alt="star-regular"/>)
                }
            </span>
        )
    })
    return(
        <div className="icon-style">
            {ratingStar}
        </div>
    )
}
export default Reviews;