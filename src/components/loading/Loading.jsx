import React from 'react'
import Swal from 'sweetalert2'

export default function Loading() {
  return (
    Swal.fire({
        title: 'Data loading',
        width: 600,
        padding: '3em',
        color: '#716add',
        didOpen:()=>{Swal.showLoading()}
    })
  )
}

