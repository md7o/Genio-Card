export default () => ({
  googleGenAIApiKey: process.env.GOOGLE_GENAI_API_KEY,
  port: parseInt(process.env.PORT || '3000', 10),
});
