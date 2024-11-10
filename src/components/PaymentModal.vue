<template>
    <ElDialog v-model="dialogVisible" title="Gerar código pix">
      <div>
        <!-- Exibe o QR Code -->
        <QrcodeVue :value="pixCode" :size="200" v-if="pixCode" />

        <!-- Exibe o código PIX copia e cola -->
        <div v-if="pixCode" class="pix-code">
          <p><strong>PIX Copia e Cola:</strong></p>
          <el-input v-model="pixCode"></el-input>
          <el-button icon="el-icon-document-copy" @click="">
            Copiar
          </el-button>
        </div>
        <div v-else>
            <div>Houve um erro no pagamento. Desculpe pelo transtorno. </div>
            <div>Tente novamente mais tarde.</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('toggleDialog')">Fechar</el-button>
      </span>
    </ElDialog>
</template>

<script lang="ts">
import axios from 'axios';
import { ref, defineComponent } from 'vue';
import { ElDialog } from 'element-plus';
import  QrcodeVue from 'qrcode.vue';
import { TOGGLE_DIALOG, useEventBus } from '../hooks/useEventBus';

 const { on } = useEventBus();

 export default defineComponent({
     props: {
         value: Number,
         pixCode: String,
     },
     components: {
         ElDialog,
         QrcodeVue
     },

     setup() {
        let loading = ref(true);
        let pixCopiaECola = ref('');
        let dialogVisible = ref(false);
        return  { loading, pixCopiaECola, dialogVisible };
     },
     mounted() {
         axios
            .post(process.env.VUE_APP_PAYMENT_URL+"/gerar-pix")
            .then((r) => { this.loading = false; this.pixCopiaECola = r.data; })
     },
     methods: {
         toggle() {
             this.dialogVisible = !this.dialogVisible
         }
     },
     beforeMount() {
         on(TOGGLE_DIALOG, this.toggle)
     },
 })
</script>
