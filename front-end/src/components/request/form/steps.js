import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { push } from 'connected-react-router'

import { formStepInc, formStepDec, formUpdate } from '../../../actions/requestFormActions'
import Button from '../../utils/Button'

const RequestFormSteps = ({ match }) => {
  const dispatch = useDispatch()
  const currentStep = useSelector(store => store.requestForm.step)
  const isUpdate = useSelector(store => !!store.availabilityRequestForm.uuid)
  const isAuthenticated = useSelector(store => store.session.isAuthenticated)
  const availabilityRequestForm = useSelector(store => store.availabilityRequestForm)

  const nextStep = () => {
    dispatch(formStepInc())
  }

  const prevStep = () => {
    dispatch(formStepDec())
  }

  const saveForm = () => {
    dispatch(formUpdate(true))
  }

  const quitForm = () => {
    dispatch(push(`/${availabilityRequestForm.uuid}`))
  }

  const step_titles = ['_padding_', 'Location', 'Dates', 'Options', 'Notifications']

  return (
    <div className="flex items-center mb-12 mt-4 space-x-12">
      <button onClick={() => prevStep()} className="flex disabled:opacity-30 cursor-point disabled:cursor-not-allowed" disabled={isUpdate && currentStep === 2}>
        <FontAwesomeIcon icon={faAngleLeft} className="text-4xl sm:text-6xl text-gray-500  " />
      </button>
      <div className="flex-grow">
        <h2 className="text-lg sm:text-3xl">
          Step {currentStep} of {isAuthenticated ? '3' : '4'}: {step_titles[currentStep]}
        </h2>
        <h5 className="text-md sm:text-xl text-gray-500">{availabilityRequestForm.facility.name}</h5>
      </div>
      {isUpdate && (
        <div className="flex-grow">
          <Button className="w-full" color="gray" onClick={quitForm}>
            Cancel
          </Button>
        </div>
      )}
      {isUpdate && (
        <div className="flex-grow">
          <Button className="w-full" color="darkGreen" onClick={saveForm}>
            Save
          </Button>
        </div>
      )}
      {isUpdate && (
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => nextStep()}
          className="flex text-right text-4xl sm:text-6xl text-gray-500 cursor-pointer"
        />
      )}
    </div>
  )
}

export default RequestFormSteps
// <Step.Group fluid className='mobile hidden'>
//   <Step active={currentStep === 1} title='Where' description='Bahia Honda' onClick={() => this.goStep(1)} />
//   <Step active={currentStep === 2} title='When' description='9/21/2017 - 10/12/2017' onClick={() => this.goStep(2)} />
//   <Step active={currentStep === 3} title='Options' description='30 amp' onClick={() => this.goStep(3)} />
//   <Step active={currentStep === 4} title='Alerts' description='test@example.com' onClick={() => this.goStep(4)} />
// </Step.Group>
