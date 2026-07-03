import { siteData } from "@/data.js";
import { cn } from "@/lib/cn.js";

const controls = [
  siteData.assets.browserControls.red,
  siteData.assets.browserControls.yellow,
  siteData.assets.browserControls.green,
];

export function BrowserMockup({
  alt = "",
  className,
  image,
  imageClassName,
  mobileImage,
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-[20px] bg-[#edeff5] p-2 pt-5",
        className,
      )}
    >
      <div className="mb-4 flex gap-1.5">
        {controls.map((control) => (
          <img
            alt=""
            aria-hidden="true"
            className="size-[11px]"
            key={control}
            src={control}
          />
        ))}
      </div>
      {image ? (
        <picture>
          {mobileImage ? (
            <source media="(max-width: 767px)" srcSet={mobileImage} />
          ) : null}
          <img
            alt={alt}
            className={cn(
              "w-full rounded-t-[9px] object-cover",
              imageClassName,
            )}
            src={image}
          />
        </picture>
      ) : null}
    </div>
  );
}
