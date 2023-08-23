import { toast } from 'react-toastify'

export function success(message: string) {
  toast(message, {
    type: 'success',
    position: toast.POSITION.TOP_RIGHT,
    className: 'toast-success',
    closeOnClick: true,
    progressClassName: 'success-progress-bar',
    bodyClassName: 'success-body',
    autoClose: 4000
  })
}