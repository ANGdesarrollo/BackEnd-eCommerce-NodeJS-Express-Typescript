import Swal, { SweetAlertIcon } from 'sweetalert2';

interface Swal {
    status: SweetAlertIcon | undefined;
    message: string;
}

export const swalAlert = ({ status, message }: Swal): any => {
    return Swal.fire({
        position: 'top-end',
        background: '#1976d2',
        width: '17rem',
        toast: true,
        icon: status,
        title: message,
        showConfirmButton: false,
        timer: 3500,
        heightAuto: false,
        imageHeight: '10rem',
        customClass: 'custom-swal',
    });
};