"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { createContent } from "@/app/api/lib/contentActions";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface ContentFormInputs {
  title: string;
  body: string;
  scheduledAt: Date | null;
  socialMedia: string[];
}

export default function ContentEditor() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContentFormInputs>({
    defaultValues: {
      title: "",
      body: "",
      scheduledAt: null,
      socialMedia: [],
    },
  });

  const onSubmit = async (data: ContentFormInputs) => {
    try {
      await createContent(data);
      toast.success("Content saved successfully!");
      reset();
    } catch (error) {
      toast.error("An error occurred while saving the content.");
    }
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="input input-bordered w-full mb-4"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        <Controller
          name="body"
          control={control}
          rules={{ required: "Body content is required" }}
          render={({ field }) => (
            <ReactQuill
              value={field.value}
              onChange={(value) => field.onChange(value)}
              className="mb-4"
            />
          )}
        />
        {errors.body && (
          <span className="text-red-500">{errors.body.message}</span>
        )}

        <div className="mb-4">
          <label htmlFor="scheduleAt" className="block text-gray-700">
            Schedule Publish Date & Time
          </label>
          <Controller
            name="scheduledAt"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                dateFormat="Pp"
                className="input input-bordered w-full"
                placeholderText="Select date and time"
              />
            )}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Select Social Media Platforms
          </label>
          <Controller
            name="socialMedia"
            control={control}
            render={({ field }) => (
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                  (platform) => (
                    <div key={platform}>
                      <input
                        type="checkbox"
                        id={platform}
                        value={platform}
                        checked={field.value.includes(platform)}
                        onChange={() => {
                          const newValue = field.value.includes(platform)
                            ? field.value.filter((p) => p !== platform)
                            : [...field.value, platform];
                          field.onChange(newValue);
                        }}
                      />
                      <label htmlFor={platform} className="ml-2">
                        {platform}
                      </label>
                    </div>
                  )
                )}
              </div>
            )}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Content"}
        </button>
      </form>
    </div>
  );
}
