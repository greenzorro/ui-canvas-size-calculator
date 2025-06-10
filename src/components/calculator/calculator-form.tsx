"use client";

import React, { useRef, useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CalculatorFormInput } from '@/types';
import { VIEWING_DISTANCE_OPTIONS, PREFERRED_CANVAS_WIDTH_OPTIONS, type ViewingDistance, type PreferredCanvasWidth } from '@/lib/constants';
import { ArrowLeftRight, ArrowUpDown, Settings2, Eye, Palette } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onSubmit, initialValues }) => {
  const { t } = useLanguage();
  const debounceRef = useRef<NodeJS.Timeout>();
  const isInitializedRef = useRef(false);

  const formSchema = z.object({
    pixelWidth: z.coerce.number().positive({ message: t("screenWidthLabel") + "必须大于0" }).int({ message: t("screenWidthLabel") + "必须是整数" }),
    pixelHeight: z.coerce.number().positive({ message: t("screenHeightLabel") + "必须大于0" }).int({ message: t("screenHeightLabel") + "必须是整数" }),
    diagonalSize: z.coerce.number().positive({ message: t("screenSizeLabel") + "必须大于0" }),
    viewingDistance: z.enum(VIEWING_DISTANCE_OPTIONS.map(opt => opt.value) as [ViewingDistance, ...ViewingDistance[]], {
      errorMap: () => ({ message: "请选择" + t("usageDistanceLabel") }),
    }),
    preferredCanvasWidth: z.enum(PREFERRED_CANVAS_WIDTH_OPTIONS.map(opt => opt.value) as [PreferredCanvasWidth, ...PreferredCanvasWidth[]], {
      errorMap: () => ({ message: "请选择" + t("designWidthLabel") }),
    }),
  });

  const form = useForm<CalculatorFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pixelWidth: initialValues?.pixelWidth || 1920,
      pixelHeight: initialValues?.pixelHeight || 1080,
      diagonalSize: initialValues?.diagonalSize || 27,
      viewingDistance: initialValues?.viewingDistance || 'medium',
      preferredCanvasWidth: initialValues?.preferredCanvasWidth || '375',
    },
    mode: 'onChange',
  });

  const handleFormSubmit: SubmitHandler<CalculatorFormInput> = (data) => {
    onSubmit(data);
  };

  // 防抖提交函数
  const debouncedSubmit = useCallback((values: CalculatorFormInput) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onSubmit(values);
    }, 300);
  }, [onSubmit]);

  // 当表单值变化时触发计算
  React.useEffect(() => {
    const subscription = form.watch(() => {
      const currentValues = form.getValues();
      
      // 检查所有必需字段是否有效
      const isValid = currentValues.pixelWidth > 0 && 
                     currentValues.pixelHeight > 0 && 
                     currentValues.diagonalSize > 0 && 
                     currentValues.viewingDistance && 
                     currentValues.preferredCanvasWidth;

      if (isValid) {
        if (!isInitializedRef.current) {
          // 首次加载时立即计算
          isInitializedRef.current = true;
          onSubmit(currentValues);
        } else {
          // 后续变化使用防抖
          debouncedSubmit(currentValues);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [debouncedSubmit, onSubmit, form]);

  // 清理定时器
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">{t('formTitle')}</CardTitle>
        <CardDescription className="text-center">
          {t('formDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pixelWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><ArrowLeftRight className="w-4 h-4 mr-2 text-primary" />{t('screenWidthLabel')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="例如: 1920" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pixelHeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><ArrowUpDown className="w-4 h-4 mr-2 text-primary" />{t('screenHeightLabel')}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="例如: 1080" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="diagonalSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Settings2 className="w-4 h-4 mr-2 text-primary" />{t('screenSizeLabel')}</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="例如: 27" {...field} />
                  </FormControl>
                  <FormDescription>{t('screenSizeDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="viewingDistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Eye className="w-4 h-4 mr-2 text-primary" />{t('usageDistanceLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('usageDistanceLabel')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VIEWING_DISTANCE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(`usageDistances.${option.value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredCanvasWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><Palette className="w-4 h-4 mr-2 text-primary" />{t('designWidthLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('designWidthLabel')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PREFERRED_CANVAS_WIDTH_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {`${option.value}px (${option.multiplier}${t('timesUnit')})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>{t('designWidthDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormInput) => void;
  initialValues?: Partial<CalculatorFormInput>;
}

export default CalculatorForm;
