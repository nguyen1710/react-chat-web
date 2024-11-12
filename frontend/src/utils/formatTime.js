// utils/formatTime.js
export function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Chuyển đổi giờ 24 sang giờ 12
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    // Định dạng phút
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${formattedMinutes} ${ampm}`;
  }
  