// NotificationService.js
import { toast } from 'react-toastify';
import { Howl } from 'howler';

const notificationSound = new Howl({
  src: ['../../assets/glass_ping-Go445-1207030150.mp3'], // Replace with the actual path to your sound file
});

export const notify = (message) => {
  notificationSound.play();
  toast.success(message);
};
