import { createStore } from "vuex";
import docGia from "~/modules/docGia";
import nhanVien from "~/modules/nhanVien";
import sach from "~/modules/sach";

const store = createStore({
    modules: {
        nhanVien,
        docGia,
        sach
    },
});

export default store;