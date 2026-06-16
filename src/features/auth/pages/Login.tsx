import { useLoginForm } from "../hooks/useLoginForm";
import LoginHeader from "../components/LoginHeader";
import LoginErrorAlert from "../components/LoginErrorAlert";
import LoginFormFields from "../components/LoginFormFields";
import LoginFooter from "../components/LoginFooter";

export default function Login() {
  const { form, errors, loading, serverError, updateField, handleSubmit } =
    useLoginForm();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      <div className="w-full max-w-md rounded-3xl border border-purple-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 my-auto">
        <LoginHeader />

        {/* Corpo do Formulário */}
        <div className="p-6 sm:p-8">
          <LoginErrorAlert error={serverError} />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            <LoginFormFields
              form={form}
              errors={errors}
              loading={loading}
              updateField={updateField}
            />

            <LoginFooter />
          </form>
        </div>
      </div>
    </div>
  );
}
