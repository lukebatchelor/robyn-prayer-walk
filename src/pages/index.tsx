import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { api } from "~/utils/api";

type FormInputs = {
  name: string;
  country: string;
  message: string;
};

export default function Home() {
  const router = useRouter();
  const sendResponse = api.responses.postResponse.useMutation();
  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, country, message } = data;
    console.log("sending data", data);
    await sendResponse
      .mutateAsync({ name, country, message })
      .catch(console.error);
    await router.push("/responses");
  };

  return (
    <>
      <Head>
        <title>Prayer Walk 2023</title>
        <meta name="description" content="Prayer Walk 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center p-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Prayer Walk <span className="text-[hsl(280,100%,70%)]">2023</span>
        </h1>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("name")}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Where are you from?</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("country")}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">
                What has God laid on your heart during this Prayer Walk?
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered textarea-primary w-full max-w-xs"
              placeholder=""
              {...register("message")}
            ></textarea>
          </div>

          <div className="text-center">
            <button className="btn btn-primary">Submit</button>
            <p>or</p>
            <p>
              See <Link href="responses">responses</Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}
