import { images } from '~/assets'

export const socials: Social[] = [
  {
    id: 1,
    icon: 'mgc_mail_fill',
    variant: 'orange'
  },
  {
    id: 2,
    icon: 'mgc_facebook_fill',
    variant: 'blue'
  }
]

export const informations: Information[] = [
  {
    id: 1,
    title: 'Quy tắc',
    desc: [
      'Đăng ký: Chọn nhân vật, đặt tên.',
      'Vượt lớp: Hoàn thành nhiệm vụ trong 7 ngày/lớp, tổng hành trình 30 ngày.',
      'Vượt nhanh: Tham gia hoạt động, đăng ảnh + bình luận để xét duyệt.'
    ],
    variant: 'pink'
  },
  {
    id: 2,
    title: 'Cách vận hành',
    desc: [
      'Hệ thống cập nhật nhiệm vụ hàng ngày.',
      'Hoàn thành nhiệm vụ → lên lớp.',
      'Có thanh tiến độ theo dõi quá trình.'
    ],
    variant: 'orange'
  },
  {
    id: 3,
    title: 'Cách nhận điểm & phần thưởng',
    desc: [
      'Điểm danh hằng ngày.',
      'Làm bài test vượt cấp.',
      'Tham gia hoạt động.',
      'Phần thưởng: Nhận quà khi lên lớp 3 và lớp 5.'
    ],
    variant: 'blue'
  }
]

export const gifts = [
  {
    id: 1,
    name: 'Bút mực',
    image: images.butmuc
  },
  {
    id: 2,
    name: 'Bút chì',
    image: images.butchi
  },
  {
    id: 3,
    name: 'Gôm',
    image: images.gom
  },
  {
    id: 4,
    name: 'Thước',
    image: images.thuoc
  },
  {
    id: 5,
    name: 'Que tính toán học',
    image: images.quetoanhoc
  },
  {
    id: 6,
    name: 'Đồ chuốt bút chì',
    image: images.chuotbutchi
  },
  {
    id: 7,
    name: 'Tập vở',
    image: images.tapvo
  },
  {
    id: 8,
    name: 'Sáp màu',
    image: images.sapmau
  }
]