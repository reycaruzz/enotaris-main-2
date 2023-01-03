import React, { useState, useRef } from 'react';
import styles from './styles';
import { apiUrl } from 'app/core/apiUrl';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import ActionSheet, {
  SheetProps,
  registerSheet,
} from 'react-native-actions-sheet';
import {
  List,
  Searchbar,
  Divider,
  IconButton,
  Button,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import InsetShadow from 'react-native-inset-shadow';
import NumberFormat from 'react-number-format';
import NavigationService from 'app/navigation/NavigationService';

var _ = require('lodash');

function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '0';
  }
}

function DetailSheet(props: SheetProps) {
  const actionSheetRef = useRef();

  const emptyDetail = {
    approved_at: '2022-07-06 12:09:58',
    approved_by: '18',
    created_at: '2022-07-06 11:55:16',
    created_by: '18',
    created_date: '2022-07-06',
    edited_at: null,
    edited_by: null,
    id: '11563',
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
    request_client: 'Coba Ngi Abaikan',
    request_contact: '55555555',
    request_document: {
      id: '48341',
      request_dokumen_id: '33',
      request_dokumen_url:
        '//trans.my.id/notaris/assets/request/1657083316_0.jpg',
      request_dokumen_desc: 'sadasd',
      request_dokumen_lat: null,
    },
    request_kredit_id: '0',
    request_name: 'Diabaikan hanya tes',
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
    request_service_detail: 'LETTER C',
    request_service_id: '3',
    request_service_name: 'PPAT',
    subservices: [
      {
        sub_service_id: '41',
        sub_service_name: 'LETTER C',
        image_url: null,
      },
      {
        sub_service_id: '42',
        sub_service_name: 'LETTER C',
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
  const [detailModal, setDetailModal] = useState(emptyDetail);
  const [subService, setSubService] = useState(emptyDetail.subservices);
  const [isEditBiaya, setEditBiaya] = useState(false);

  //
  const [loader, setLoader] = useState(false);

  const onUploadPhoto = (item, id, nama, uri, isButton) => {
    NavigationService.navigate('UploadPhoto', {
      item: item,
      id_layanan: id,
      nama_layanan: nama,
      uri: uri,
      referrer: 'RequestList',
      isButton: isButton,
    });
  };

  const onSubmitBiaya = () => {
    setLoader(true);
    const data = new FormData();
    if (detailModal) {
      data.append('id_req', detailModal.id);
      data.append('id_user', userData.iduser);
      data.append('subservices', JSON.stringify(subService));
      data.append('bea_notaris', notaris.replace(/\D/g, ''));
      data.append('bea_bpn', bpn.replace(/\D/g, ''));
    }
    fetch(apiUrl.api + 'biayaupdate', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setLoader(false);
        // console.log(response.text());
        response
          .json()
          .then((dataRes) => {
            if (dataRes.success == true) {
              Alert.alert('Submit Success', 'Ubahan Biaya berhasil diajukan', [
                {
                  text: 'OK',
                  onPress: () => {
                    actionSheetRef.current?.hide();
                    // setRefreshing(true);
                    // populateData(true, activeTab);
                    // isActiveOrNot(0);
                  },
                },
              ]);
            }
          })
          .catch((error) => {
            Alert.alert('Submit Failed', 'Ada masalah pada server');
            console.error(error);
          });
      })
      .catch((error) => console.error('network error', error));
  };
  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={true}
      ref={actionSheetRef}
      onBeforeShow={(data) => {
        setDetailModal(data);
        setSubService(data.subservices);
      }}>
      <View style={{ height: '100%' }}>
        <View style={styles.modalContentContainer}>
          <View style={styles.scrollListContainer}>
            <ScrollView
              fadingEdgeLength={30}
              showsVerticalScrollIndicator={false}
              contentContainerstyle={styles.documentScrollView}
              nestedScrollEnabled={true}
              onMomentumScrollEnd={() =>
                actionSheetRef.current?.handleChildScrollEnd()
              }>
              <Text style={styles.headerModalText}>Nama Klien</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.request_client}
              </Text>
              <Text style={styles.headerModalText}>Kontak Klien</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.request_contact || 'Tidak ada kontak'}
              </Text>
              <Text style={styles.headerModalText}>Nama Bank</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.nama_bank || 'Tidak ada bank'}
              </Text>
              <Text style={styles.headerModalText}>Nama Order</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.request_name}
              </Text>
              <Text style={styles.headerModalText}>Catatan Order</Text>
              <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                {detailModal.keterangan || 'Tidak ada catatan'}
              </Text>
              <View style={styles.headerModalContainer}>
                <Text style={styles.headerModalText}>Detail Biaya</Text>
                {detailModal.request_service_id === '1' && (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      if (isEditBiaya) {
                        setEditBiaya(false);
                      } else {
                        setEditBiaya(true);
                      }
                    }}>
                    <Text style={styles.editButtonText}>
                      {isEditBiaya ? 'Batal' : 'Edit Biaya'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                  Biaya Order :
                </Text>
                <Text style={[styles.subHeaderModalText]}>
                  {detailModal.request_payment_amount
                    ? 'Rp ' +
                      numberWithCommas(detailModal.request_payment_amount)
                    : 'Tidak ada biaya'}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                  Biaya BPN :
                </Text>
                <Text style={[styles.subHeaderModalText]}>
                  {detailModal.request_payment_bpn
                    ? [
                        detailModal.request_payment_bpn_change
                          ? 'Rp ' +
                            numberWithCommas(detailModal.request_payment_bpn) +
                            ' -> ' +
                            'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_bpn_change,
                            )
                          : 'Rp ' +
                            numberWithCommas(detailModal.request_payment_bpn),
                      ]
                    : [
                        detailModal.request_payment_bpn_change
                          ? 'Tidak ada biaya' +
                            ' -> ' +
                            'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_bpn_change,
                            )
                          : 'Tidak ada biaya',
                      ]}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                  Biaya Notaris :
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[styles.subHeaderModalText, { width: 150 }]}>
                  {detailModal.request_payment_notaris
                    ? [
                        detailModal.request_payment_notaris_change
                          ? 'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_notaris,
                            ) +
                            ' -> ' +
                            'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_notaris_change,
                            )
                          : 'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_notaris,
                            ),
                      ]
                    : [
                        detailModal.request_payment_notaris_change
                          ? 'Tidak ada biaya' +
                            ' -> ' +
                            'Rp ' +
                            numberWithCommas(
                              detailModal.request_payment_notaris_change,
                            )
                          : 'Tidak ada biaya',
                      ]}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                  Biaya Plafond Awal :
                </Text>
                <Text style={[styles.subHeaderModalText]}>
                  {detailModal.request_plafond_awal
                    ? 'Rp ' + numberWithCommas(detailModal.request_plafond_awal)
                    : 'Tidak ada biaya'}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.subHeaderModalText, { width: 150 }]}>
                  Biaya Plafond Akhir :
                </Text>
                <Text style={[styles.subHeaderModalText, { marginBottom: 10 }]}>
                  {detailModal.request_plafond_akhir
                    ? 'Rp ' +
                      numberWithCommas(detailModal.request_plafond_akhir)
                    : 'Tidak ada biaya'}
                </Text>
              </View>
              {isEditBiaya && (
                <View>
                  <Text style={styles.headerModalText}>Biaya Baru</Text>
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    value={bpn}
                    renderText={(value) => (
                      <TextInput
                        label="Masukkan biaya BPN baru"
                        mode="outlined"
                        key="pembayaraninput"
                        style={styles.inputTextContainer}
                        defaultValue={detailModal.request_payment_bpn_change}
                        value={value}
                        keyboardType="numeric"
                        theme={{
                          colors: {
                            placeholder: theme.colors.placeholder,
                            primary: theme.colors.secondary,
                            background: '#F6F8FA',
                          },
                        }}
                        onChangeText={(text) => {
                          setBpn(text);
                        }}
                      />
                    )}
                  />
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp '}
                    value={notaris}
                    renderText={(value) => (
                      <TextInput
                        label="Masukkan biaya Notaris baru"
                        mode="outlined"
                        key="pembayaraninput"
                        style={[
                          styles.inputTextContainer,
                          { marginBottom: 10 },
                        ]}
                        defaultValue={
                          detailModal.request_payment_notaris_change
                        }
                        value={value}
                        keyboardType="numeric"
                        theme={{
                          colors: {
                            placeholder: theme.colors.placeholder,
                            primary: theme.colors.secondary,
                            background: '#F6F8FA',
                          },
                        }}
                        onChangeText={(text) => {
                          setNotaris(text);
                        }}
                      />
                    )}
                  />
                  <View style={styles.submitButtonContainer}>
                    <Button
                      mode="contained"
                      labelStyle={
                        Platform.OS === 'ios'
                          ? [
                              styles.buttonSubmitLabel,
                              {
                                fontWeight: 'bold',
                              },
                            ]
                          : styles.buttonSubmitLabel
                      }
                      style={styles.buttonSubmit}
                      onPress={() => {
                        onSubmitBiaya();
                      }}>
                      {loader ? 'Mengirimkan..' : 'Ajukan Ubahan'}
                    </Button>
                  </View>
                </View>
              )}

              <Text style={styles.headerModalText}>Histori</Text>
              <Text style={styles.muteHeaderModalText}>
                {'• Diposting pada ' + detailModal.created_at}
              </Text>
              <Text style={styles.muteHeaderModalText}>
                {detailModal.is_approved === '2'
                  ? '• Ditolak pada ' + detailModal.approved_at
                  : '• Disetujui pada ' + detailModal.approved_at}
              </Text>
              <View style={{ height: 20 }}></View>
            </ScrollView>
          </View>
        </View>
        <View style={[styles.modalContentContainer, { flex: 1.5 }]}>
          <View style={styles.innerSheetContainer}>
            <View style={[styles.textContainerHeader]}>
              <Text
                style={[styles.sheetTitle, { color: 'white', marginTop: 10 }]}>
                Jenis Layanan
              </Text>
            </View>
            <View style={styles.scrollListContainer}>
              <InsetShadow
                left={false}
                right={false}
                top={false}
                shadowRadius={20}
                shadowOpacity={0.6}
                elevation={20}>
                <ScrollView
                  fadingEdgeLength={20}
                  style={styles.documentScrollView}
                  contentContainerStyle={{ flexGrow: 1 }}>
                  {subService.length > 0 && subService[0].image_url ? (
                    <View
                      key="scrolltextcontainer"
                      style={styles.scrollTextContainerHeader}>
                      <Text
                        style={[
                          styles.muteHeaderModalText,
                          { color: 'white' },
                        ]}>
                        Sudah melakukan serah terima
                      </Text>
                    </View>
                  ) : (
                    [
                      detailModal.project_done === '1' ? (
                        <View
                          key="scrolltextcontainerheader"
                          style={styles.scrollTextContainerHeader}>
                          <Text
                            style={[
                              styles.muteHeaderModalText,
                              { color: 'white' },
                            ]}>
                            Ketuk nama layanan untuk menambah bukti serah terima
                          </Text>
                          <Text
                            style={[
                              styles.muteHeaderModalText,
                              { color: 'white' },
                            ]}>
                            * Semua layanan harus memiliki bukti serah terima
                            untuk dapat dikirim
                          </Text>
                        </View>
                      ) : (
                        <View
                          key="scrolltextcontainerheader"
                          style={styles.scrollTextContainerHeader}>
                          <Text
                            style={[
                              styles.muteHeaderModalText,
                              { color: 'white' },
                            ]}>
                            Order ini belum bisa menerima upload bukti serah
                            terima
                          </Text>
                        </View>
                      ),
                    ]
                  )}

                  {subService.map((item, index) => (
                    <View
                      style={styles.documentListContainer}
                      key={'viewcontainer' + index}>
                      <TouchableOpacity
                        style={styles.documentLabelContainer}
                        key={'touch' + item.sub_service_id.toString() + index}
                        onPress={() => {
                          if (item.image_url) {
                            onUploadPhoto(
                              detailModal,
                              item.sub_service_id,
                              item.sub_service_name,
                              item.tempUri,
                              false,
                            );
                          } else {
                            if (detailModal.project_done === '1') {
                              onUploadPhoto(
                                detailModal,
                                item.sub_service_id,
                                item.sub_service_name,
                                item.tempUri,
                                true,
                              );
                            } else {
                              Alert.alert(
                                'Peringatan',
                                'Anda belum bisa mengupload bukti serah terima',
                              );
                            }
                          }
                        }}>
                        <Text
                          key={'txt' + item.sub_service_id.toString() + index}
                          style={styles.checkboxDocumentLabel}>
                          {item.sub_service_name}
                        </Text>
                      </TouchableOpacity>
                      <Divider styles={{ width: '80%' }} />
                      <Text style={styles.checkboxFileLabel}>
                        {item.fileName || item.image_url
                          ? item.fileName || item.image_url
                          : '* Bukti serah terima belum tersedia'}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </InsetShadow>
            </View>
            {_.filter(subService, (o) => {
              return o.img64 !== undefined;
            }).length === subService.length && (
              <View style={styles.submitButtonContainer}>
                <Button
                  mode="contained"
                  onPress={onApproval}
                  labelStyle={[styles.buttonSubmitLabel]}
                  style={styles.buttonSubmit}>
                  {loader ? 'Mengirimkan..' : 'Kirim Bukti Serah Terima'}
                </Button>
              </View>
            )}
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}

// Register your Sheet component.
registerSheet('detailsheet', DetailSheet);

export default DetailSheet;
