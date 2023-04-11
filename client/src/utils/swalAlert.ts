import Swal, {SweetAlertIcon} from 'sweetalert2';

interface Swal {
    status: SweetAlertIcon | undefined;
    message: string;
}

export const swalAlert = ({status, message}: Swal) => {
    return Swal.fire({
        position: 'top-end',
        background: '#1976d2',
        width: "17rem",
        toast: true,
        icon: status,
        title: message,
        showConfirmButton: false,
        timer: 2500,
        heightAuto: false,
        imageHeight: '10rem',
        customClass: 'custom-swal'
    })
}
