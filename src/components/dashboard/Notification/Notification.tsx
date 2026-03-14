
import { Bell, CheckCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useSocket } from '../../../hooks/socketConnection';
import { useGetNotificationsQuery, useReadAllNotificationMutation } from '../../../redux/features/notification/notificationApi';
import { useGetProfileQuery } from '../../../redux/features/user/userApi';
import ManagePagination from '../../Shared/ManagePagination';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const DEMO_NOTIFICATIONS = [
  {
    _id: '1',
    title: 'Booking Confirmed',
    message: 'Your booking for Toyota Camry (2023) has been confirmed by the host.',
    type: 'APPROVED',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    _id: '2',
    title: 'New Booking Request',
    message: 'John Doe has requested to book your Honda Civic for 3 days.',
    type: 'REQUESTED',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    _id: '3',
    title: 'Booking Rejected',
    message: 'Unfortunately your booking request for BMW X5 was declined.',
    type: 'REJECTED',
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    _id: '4',
    title: 'Payment Received',
    message: 'You received a payment of $250 for your Ford Mustang rental.',
    type: 'PAYMENT',
    read: true,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    _id: '5',
    title: 'New User Joined',
    message: 'Sarah Connor just signed up and is exploring cars near you.',
    type: 'USER',
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    _id: '6',
    title: 'Booking Confirmed',
    message: 'Your booking for Tesla Model 3 has been confirmed.',
    type: 'APPROVED',
    read: true,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    _id: '7',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday 2AM–4AM. Services may be unavailable.',
    type: 'SYSTEM',
    read: true,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    _id: '8',
    title: 'New Booking Request',
    message: 'Alice Wang requested your Audi A4 for the weekend.',
    type: 'REQUESTED',
    read: true,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];


const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const NotificationItem = ({ notification, onRead }: any) => {

  return (
    <div
      onClick={() => onRead()}
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${!notification.read ? 'bg-white' : ''
        }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full bg-blue-100 text-blue-600  flex items-center justify-center flex-shrink-0`}>
          <Bell className={`w-5 h-5 text-blue-600`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
              {notification.title}
            </p>
            <div className="flex items-center gap-2 justify-between flex-shrink-0">
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-500 mt-0.5 leading-snug">{notification.text}</p>
            <p className="text-xs text-gray-400">{formatTimeAgo(notification.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Notification = () => {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const { data: profileData } = useGetProfileQuery({});

  const scrollContainerRef = useRef(null);
  const { data: notificationsData, refetch } = useGetNotificationsQuery({});
  const [readAllNotification] = useReadAllNotificationMutation();

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const socket = useSocket()

  useEffect(() => {
    if (!socket) return;

    socket.on(`send-notification::${profileData?._id}`, () => { refetch() });
    socket.on(`unreadCountUpdate::${profileData?._id}`, () => { refetch() });

    return () => {
      socket.off(`send-notification::${profileData?._id}`);
      socket.off(`unreadCountUpdate::${profileData?._id}`);
    }
  }, [])

  const handleMarkAllRead = async () => {
    try {
      const response = await readAllNotification({}).unwrap();
      if (response?.success) {
        toast.success(response?.message);
      }
    } catch (error: any) {
      console.error(error?.data?.message);
    }
  };

  return (
    <div className="">
      <div className=" mx-auto px-4 py-6">
        <Card className="bg-white shadow-sm border border-gray-200 overflow-hidden">

          {/* Header */}
          <header className="sticky top-0  bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg! font-bold text-gray-900">Notifications</h3>
              {unreadCount > 0 ? (
                <p className="text-sm text-gray-500 mt-0.5">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-0.5">All caught up!</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-40 gap-1.5 text-sm"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          </header>

          {/* List */}
          <div
            ref={scrollContainerRef}
            className="divide-y divide-gray-100 min-h-[30vh] max-h-[65vh] overflow-y-auto"
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-1">No notifications yet</h3>
                <p className="text-sm text-gray-400">When you get notifications, they'll show up here</p>
              </div>
            ) : (
              notificationsData?.data?.map((notif: any) => (
                <NotificationItem
                  key={notif._id}
                  notification={notif}
                  onRead={handleMarkAllRead}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <ManagePagination meta={notificationsData?.meta} />
        </Card>
      </div>
    </div>
  );
};

export default Notification;