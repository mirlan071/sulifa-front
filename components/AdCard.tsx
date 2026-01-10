import { Ad } from '@/types';
import FavoriteButton from './FavoriteButton';

interface AdCardProps {
    ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
    return (
        <div className="group relative border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500">
            {/* Кнопка избранного */}
            <div className="absolute top-4 right-4 z-10">
                <FavoriteButton ad={ad} size="sm" />
            </div>

            {/* Заголовок */}
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white pr-8">
                {ad.title}
            </h3>

            {/* Описание */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {ad.description}
            </p>

            {/* Цена и категория */}
            <div className="flex justify-between items-center mb-3">
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${ad.price.toLocaleString()}
                </p>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800">
                    {ad.category}
                </span>
            </div>

            {/* Детали */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
                    {ad.region}
                </span>
                <span>{new Date(ad.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
        </div>
    );
}