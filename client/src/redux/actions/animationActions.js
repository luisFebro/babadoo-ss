// naming structure: action > type > speficification e.g action: GET_MODAL_BLUE / func: getModalBlue
// About: activating an animation
// (especially from another component eg after click on a btn in the modal, run an anima in another component)
// and manage Animation using setTimeout and useRef Hook (requires to set the function, useRef and setTimeout in the target component)
// not working
export const animateAnotherComponent = (dispatch) => {
    dispatch({type: 'ANIMATION_RUN_TIMER', payload: 3000}); //delay to run is sent to reducer
}