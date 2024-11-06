<template>
    <ElDialog v-model="dialogVisible" title="Gerar código pix">
        <div v-if="loading">
        <el-loading-spinner />
      </div>
      <div v-else>
        <!-- Exibe o QR Code -->
        <qrcode-vue :value="pixCopiaECola" :size="200" v-if="pixCopiaECola" />

        <!-- Exibe o código PIX copia e cola -->
        <div v-if="pixCopiaECola" class="pix-code">
          <p><strong>PIX Copia e Cola:</strong></p>
          <el-input v-model="pixCopiaECola"></el-input>
          <el-button icon="el-icon-document-copy" @click="">
            Copiar
          </el-button>
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

 export default defineComponent({
     props: {
         value: Number,
     },
     components: {
         ElDialog,
     },

     setup() {
        const loading = ref(true);
        const pixCopiaECola = ref('');
         const dialogVisible = ref(false);
         const copyToClipboard = (text: string) => {
            navigator.clipboard.writeText(text).then(() => {
                alert('Código PIX copiado para a área de transferência!');
        });

        return  {copyToClipboard, loading, pixCopiaECola, dialogVisible };
    };
     },
     mounted() {
         axios
            .post(process.env.VUE_APP_PAYMENT_URL+"/gerar-pix")
            .then((r) => { loading.value = false; pixCopiaECola.value = r.data; })
     }
 })
</script>
