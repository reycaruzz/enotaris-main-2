import { apiUrl } from 'app/core/apiUrl';

export const emptyDetail = {
  approved_at: '2022-07-06 12:09:58',
  approved_by: '18',
  created_at: '2022-07-06 11:55:16',
  created_by: '18',
  created_date: '2022-07-06',
  edited_at: null,
  edited_by: null,
  id: null,
  id_bank: null,
  is_approved: '1',
  is_deleted: '0',
  keterangan: 'tes',
  nama_bank: null,
  nama_kredit: null,
  project_done: '0',
  project_id: '11065',
  project_status: '2',
  request_bank_id: '0',
  request_client: 'Placeholder',
  request_contact: '0812345678',
  request_document: {
    id: '48341',
    request_dokumen_id: '33',
    request_dokumen_url:
      '//trans.my.id/notaris/assets/request/1657083316_0.jpg',
    request_dokumen_desc: 'Description',
    request_dokumen_lat: null,
  },
  request_kredit_id: '0',
  request_name: 'Placeholder',
  request_payment: '2',
  request_payment_amount: '0',
  request_payment_bpn: '0',
  request_payment_bpn_change: null,
  request_payment_detail: '',
  request_payment_notaris: '0',
  request_payment_notaris_change: null,
  request_payment_url: null,
  request_plafond_akhir: '0',
  request_plafond_awal: '0',
  request_service_detail: 'Placeholder',
  request_service_id: '1',
  request_service_name: 'PPAT',
  subservices: [
    {
      sub_service_id: '41',
      sub_service_name: 'Placeholder',
      image_url: null,
    },
  ],
  ttd_pihak: {
    id: '14652',
    request_ttd_url:
      '//trans.my.id/notaris/assets/attachment/1657086216_ttdpihak_0.jpg',
    request_ttd_desc: null,
    request_ttd_lat: null,
    request_ttd_lng: null,
  },
};

export const categoryService = [
  {
    id: 1,
    type_name: 'PERBANKAN',
    jml_request: '0',
    type_image: apiUrl.assets + 'img/bank.png',
    resume_detail: [
      {
        done: '0',
        processed: '0',
        reject: '0',
        requested: '0',
      },
    ],
  },
  {
    id: 2,
    type_name: 'NOTARIS',
    jml_request: '0',
    type_image: apiUrl.assets + 'img/kumham.png',
    resume_detail: [
      {
        done: '0',
        processed: '0',
        reject: '0',
        requested: '0',
      },
    ],
  },
  {
    id: 3,
    type_name: 'PPAT',
    jml_request: '0',
    type_image: apiUrl.assets + 'img/name.png',
    resume_detail: [
      {
        done: '0',
        processed: '0',
        reject: '0',
        requested: '0',
      },
    ],
  },
];

export const categoryDefault = [
  {
    id: 0,
    name: 'SEMUA',
    is_active: true,
  },
  {
    id: 1,
    name: 'DIAJUKAN',
    is_active: false,
  },
  {
    id: 2,
    name: 'DIPROSES',
    is_active: false,
  },
  {
    id: 3,
    name: 'DISETUJUI',
    is_active: false,
  },
  {
    id: 4,
    name: 'SERAH TERIMA',
    is_active: false,
  },
  {
    id: 5,
    name: 'SELESAI',
    is_active: false,
  },
  {
    id: 6,
    name: 'DITOLAK',
    is_active: false,
  },
];

export const jobCategoryService = [
  {
    id: 0,
    name: 'SEMUA',
    is_active: true,
  },
  {
    id: 1,
    name: 'PERBANKAN',
    is_active: false,
    img_url: apiUrl.assets + 'img/bank.png',
  },
  {
    id: 2,
    name: 'NOTARIS',
    is_active: false,
    img_url: apiUrl.assets + 'img/kumham.png',
  },
  {
    id: 3,
    name: 'PPAT',
    is_active: false,
    img_url: apiUrl.assets + 'img/name.png',
  },
];

export const jobCategoryDefault = [
  {
    id: 0,
    name: 'SEMUA',
    is_active: true,
  },
  {
    id: 1,
    name: 'TUGAS',
    is_active: false,
  },
  {
    id: 2,
    name: 'SELESAI',
    is_active: false,
  },
];
