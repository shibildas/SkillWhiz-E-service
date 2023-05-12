export function filterVoucher([searchText, filter], datas) {
  switch (parseInt(filter)) {
    case 1:
      return datas.filter((content) =>
        content?.vouchername.toLowerCase().includes(searchText.toLowerCase())
      );
    case 2:
      return datas.filter((content) =>
        content?.code.toLowerCase().includes(searchText.toLowerCase())
      );

    default:
      return datas;
  }
}
export function filterbooking([searchText, filter], datas) {
  switch (parseInt(filter)) {
    case 1:
      return datas.filter((content) =>
        content?.jobId?.job_role
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
      );

    case 2:
      return datas.filter((content) =>
        content?.status?.toLowerCase().includes(searchText.toLowerCase())
      );

    case 3:
      return datas.filter((content) =>
        content?.estimate?.status
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
      );

    case 4:
      return datas.filter((content) =>
        content?.slot?.toLowerCase().includes(searchText.toLowerCase())
      );

    case 5:
      return datas.filter((content) =>
        new Date(content?.booking_date)
          ?.toLocaleString("en-US", {
            timeZone: "UTC",
          })
          .includes(searchText)
      );

    case 6:
      return datas.filter((content) =>
        content?.payment?.payment_status
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
      );

    default:
      return datas;
  }
}
export function filterUsers([searchText, filter], datas){
 switch (parseInt(filter)) {
    case 1:
        return datas.filter((content) =>
        content?.username.toLowerCase().includes(searchText.toLowerCase())
      );
    case 2:
        return datas.filter((content) =>
        content?.email.toLowerCase().includes(searchText.toLowerCase())
      );
    case 3:
        return datas.filter((content) =>
        content?.mobile.includes(searchText)
      );
 
    default:
        return datas;
 }
}

export function filterJobs([searchText, filter], datas){
    switch (parseInt(filter)) {
        case 1:
            return datas.filter((content) =>
            content?.job_role?.toLowerCase().includes(searchText.toLowerCase())
          );
          default:
            return datas;
}
}
